/**
 * Upload File
 * @returns {ReactElement} Upload File
 */
import "tailwindcss/tailwind.css";

import {
	ArrowBackIcon,
	CloseIcon,
	DownloadIcon,
	RepeatIcon
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	SlideFade,
	Switch,
	Text,
	Textarea,
	useToast
} from "@chakra-ui/react";

import { RiArrowRightUpLine } from "react-icons/ri";
import { uploadGraph } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { validateJSON } from "@/utils/validateJSON";
import { parseGraphData } from "@/utils/extractGraphData";

export default function UploadFile() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [graphName, setGraphName] = useState("");
	const [graphDescription, setGraphDescription] = useState("");
	const [graphVisibility, setGraphVisibility] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();
	const router = useRouter();
	const { firebaseUser } = useAuth();

	const handleDownloadExample = async (nodeNum: number) => {
		try {
			const fileUrl =
				nodeNum === 10 ? "/10_node_example.json" : "/100_node_example.json";

			const response = await fetch(fileUrl);
			const blob = await response.blob();

			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = `${nodeNum}_nodes_example.json`;
			link.click();
		} catch (error) {
			console.error("Error downloading file:", error);
		}
	};

	const handleSwitchToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGraphVisibility(e.target.checked);
	};

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		handleFileChange(file);
	};

	const handleRemoveFile = () => {
		setSelectedFile(null);
		setGraphName("");
		setGraphDescription("");
		setGraphVisibility(false);
		const fileInput = document.getElementById("fileInput") as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
		}
	};

	const handleFileChange = (file: File | null) => {
		if (file && file.type === "application/json") {
			setSelectedFile(file);
		} else {
			// TODO - display invalid file error
			setSelectedFile(null);
		}
	};

	const handleSaveClick = async () => {
		setIsLoading(true);

		try {
			if (selectedFile) {
				// Validate the file content before uploading
				const fileContent = await selectedFile.text();
				const validationResult = validateJSON(fileContent);

				if (!validationResult.isValid) {
					console.error("Invalid graph data:", validationResult.errorMessage);
					toast({
						title: "Invalid graph data",
						description: validationResult.errorMessage,
						status: "error",
						duration: 5000,
						isClosable: true
					});
					setIsLoading(false);
					return;
				}

				// Parse Graph Data Before Uploading
				const graphTags = parseGraphData(fileContent);

				// If validation passes, proceed with uploading
				const graph = await uploadGraph(
					firebaseUser,
					selectedFile,
					graphName,
					graphDescription,
					graphVisibility,
					graphTags
				);

				toast({
					title: "Graph saved",
					description: `The following graph has been saved to your account: ${graph?.graphName}`,
					status: "success",
					duration: 5000,
					isClosable: true
				});
				router.push("/");
			}
		} catch (error) {
			toast({
				title: "Error while saving graph",
				description: `Error: ${error}`,
				status: "error",
				duration: null,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-gray-800 h-screen overflow-auto relative">
			<Button
				leftIcon={<ArrowBackIcon color="white" />}
				className="fixed top-4 left-4"
				variant="ghost"
				colorScheme="whiteAlpha"
				onClick={() => {
					router.push("/");
				}}
			>
				<Text color="white">Back to Home</Text>
			</Button>

			<div className="h-full max-w-4xl mx-auto flex flex-col items-center justify-center">
				<div className="bg-white rounded-lg p-8 shadow-md w-full">
					<Box className="text-center">
						<Heading className="text-center text-4xl">File Upload</Heading>
						<Text className="pt-2">
							Upload your JSON data to be used in your graph.
						</Text>

						{/* Drag and Drop box */}
						<div
							className={`border border-dashed border-black rounded-lg h-48 mt-4 flex flex-col items-center justify-center ${
								isDragging ? "bg-gray-100" : ""
							}`}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
							onDragOver={handleDragOver}
							onDrop={handleDrop}
						>
							<input
								type="file"
								accept=".json"
								onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
								className="hidden"
								id="fileInput"
							/>
							<label htmlFor="fileInput" className="cursor-pointer">
								<span className="underline">
									Browse your computer or drag and drop here
								</span>
							</label>
							{selectedFile && (
								<div className="flex flex-col gap-2">
									<Text mt={2} className="text-primary-500">
										Selected file: {selectedFile.name}
									</Text>
									<IconButton
										isRound={true}
										aria-label="delete file"
										variant="ghost"
										size="sm"
										icon={<CloseIcon />}
										onClick={handleRemoveFile}
									/>
								</div>
							)}
						</div>

						{/* Sample JSON Files */}
						{!selectedFile && (
							<div className="flex flex-col gap-2 mt-6">
								<Divider orientation="horizontal" borderColor="gray.400" />
								<Text className="pt-2">
									Try our example files, which can be uploaded and opened. Not
									sure where to start? Check out our User Guide.
								</Text>

								<div className="flex flex-row gap-2 justify-center w-full">
									<Button
										className="border rounded-lg p-2"
										size="sm"
										rightIcon={<DownloadIcon />}
										onClick={() => handleDownloadExample(10)}
									>
										10 Node Example
									</Button>

									<Button
										className="border rounded-lg p-2"
										size="sm"
										rightIcon={<DownloadIcon />}
										onClick={() => handleDownloadExample(100)}
									>
										100 Node Example
									</Button>

									<Button
										className="border rounded-lg p-2"
										as="a"
										href="https://docs.google.com/document/d/1PY3aDcpMCG_7qnzSSssFF1nvCmY3Tb28pG5efoUcyBk/edit?usp=sharing"
										target="_blank"
										rel="noopener noreferrer"
										size="sm"
									>
										Open user guide{" "}
										<RiArrowRightUpLine className="ml-2" size={16} />
									</Button>
								</div>
							</div>
						)}

						{selectedFile && (
							<SlideFade
								in={!!selectedFile}
								offsetY="50px"
								transition={{ enter: { duration: 0.6 } }}
							>
								<form>
									<FormControl>
										{/* Graph Name */}
										<FormLabel className="pt-7">Graph Name</FormLabel>
										<Input
											className="w-full p-2 border rounded-lg"
											placeholder="Enter a name for your graph"
											_placeholder={{ opacity: 1, color: "gray.600" }}
											onChange={(e) => setGraphName(e.target.value)}
											value={graphName}
										/>

										{/* Graph Description */}
										<FormLabel className="pt-7">Graph Description</FormLabel>
										<Textarea
											className="w-full p-2 border rounded-lg"
											placeholder="Enter a description for your graph"
											_placeholder={{ opacity: 1, color: "gray.600" }}
											onChange={(e) => setGraphDescription(e.target.value)}
											value={graphDescription}
										/>

										<FormLabel className="pt-7"> Visibility</FormLabel>
										<Box className="pl-5" textAlign="left">
											<Switch
												onChange={handleSwitchToggle}
												isChecked={graphVisibility}
												aria-label="Enable Public Visibility"
											>
												Publically Available
											</Switch>
										</Box>

										{/* Buttons */}
										<div className="flex flex-row gap-4 justify-center mt-7">
											<Button
												className="border rounded-lg p-2"
												rightIcon={<RepeatIcon />}
												onClick={handleRemoveFile}
											>
												Start Over
											</Button>

											<Button
												colorScheme="blue"
												className="w-fit"
												onClick={handleSaveClick}
												isLoading={isLoading}
												loadingText="Saving graph..."
											>
												Save graph to your account
											</Button>
										</div>
									</FormControl>
								</form>
							</SlideFade>
						)}
					</Box>
				</div>
			</div>
		</div>
	);
}
