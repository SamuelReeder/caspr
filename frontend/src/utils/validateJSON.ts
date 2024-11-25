interface ValidationResult {
	isValid: boolean;
	errorMessage: string | null;
}

export const validateJSON = (json: string): ValidationResult => {
	try {
		// Check if JSON syntax is valid
		const data = JSON.parse(json);

		// Validate top-level structure of graph data
		const graphDataValidationResult = validateGraphData(data);
		if (!graphDataValidationResult.isValid) {
			return graphDataValidationResult;
		}

		// Validate each timestamp
		for (const timestamp of data.timestamps) {
			const timestampValidationResult = validateTimestamp(timestamp);
			if (!timestampValidationResult.isValid) {
				return timestampValidationResult;
			}
		}

		// Validate each node
		for (const timestamp of data.timestamps) {
			for (const node of timestamp.nodes) {
				const nodeValidationResult = validateNode(node);
				if (!nodeValidationResult.isValid) {
					return nodeValidationResult;
				}
			}
		}

		// Validate each edge
		for (const timestamp of data.timestamps) {
			for (const edge of timestamp.edges) {
				const edgeValidationResult = validateEdge(edge, timestamp.nodes);
				if (!edgeValidationResult.isValid) {
					return edgeValidationResult;
				}
			}
		}

		// If passes all validation, return the data
		return {
			isValid: true,
			errorMessage: null
		};
	} catch (error) {
		return {
			isValid: false,
			errorMessage: `Invalid JSON syntax: ${error}`
		};
	}
};

const validateGraphData = (data: any): ValidationResult => {
	let isValid = true;
	let errorMessage = null;

	// If data is not an object or is null, it is not a valid graph
	if (typeof data !== "object" || data === null) {
		isValid = false;
		errorMessage = "Invalid graph JSON format";
	}

	// If time_unit is not a string, it is not a valid graph
	if (typeof data.time_unit !== "string") {
		isValid = false;
		errorMessage = "Invalid time_unit, must be a string";
	}

	// If timestamps is not an array, it is not a valid graph
	if (!Array.isArray(data.timestamps)) {
		isValid = false;
		errorMessage = "Invalid timestamps, must be an array";
	}

	if (!data.timestamps.length) {
		isValid = false;
		errorMessage = "Timestamps array cannot be empty";
	}

	return {
		isValid,
		errorMessage: errorMessage
	};
};

const validateTimestamp = (timestamp: any): ValidationResult => {
	let isValid = true;
	let errorMessage = null;

	if (typeof timestamp !== "object") {
		isValid = false;
		errorMessage = "Invalid timestamp, must be an object";
	}

	if (timestamp === null) {
		isValid = false;
		errorMessage = "Timestamp cannot be null";
	}

	if (typeof timestamp.t !== "number") {
		isValid = false;
		errorMessage = "Invalid timestamp, must be a number";
	}

	if (!Array.isArray(timestamp.nodes)) {
		isValid = false;
		errorMessage = "Invalid timestamp, nodes must be an array";
	}

	if (!Array.isArray(timestamp.edges)) {
		isValid = false;
		errorMessage = "Invalid timestamp, edges must be an array";
	}

	return {
		isValid,
		errorMessage: errorMessage
	};
};

const validateNode = (node: any): ValidationResult => {
	let isValid = true;
	let errorMessage = null;

	if (typeof node !== "object") {
		isValid = false;
		errorMessage = "Invalid node, must be an object";
	}

	if (node === null) {
		isValid = false;
		errorMessage = "Node cannot be null";
	}

	if (typeof node.id !== "string") {
		isValid = false;
		errorMessage = "Invalid node, id must be a string";
	}

	if (typeof node.label !== "string") {
		isValid = false;
		errorMessage = "Invalid node, label must be a string";
	}

	if (typeof node.value !== "number") {
		isValid = false;
		errorMessage = "Invalid node, value must be a number";
	}

	if (typeof node.category !== "string") {
		isValid = false;
		errorMessage = "Invalid node, category must be a string";
	}

	return {
		isValid,
		errorMessage: errorMessage
	};
};

const validateEdge = (edge: any, nodes: any[]): ValidationResult => {
	let isValid = true;
	let errorMessage = null;

	if (typeof edge !== "object") {
		isValid = false;
		errorMessage = "Invalid edge, must be an object";
	}

	if (edge === null) {
		isValid = false;
		errorMessage = "Edge cannot be null";
	}

	if (typeof edge.source !== "string") {
		isValid = false;
		errorMessage = "Invalid edge, source must be a string";
	}

	if (typeof edge.target !== "string") {
		isValid = false;
		errorMessage = "Invalid edge, target must be a string";
	}

	if (typeof edge.relationship !== "string") {
		isValid = false;
		errorMessage = "Invalid edge, relationship must be a string";
	}

	if (typeof edge.strength !== "number") {
		isValid = false;
		errorMessage = "Invalid edge, strength must be a number";
	}

	if (edge.strength < 0 || edge.strength > 1) {
		isValid = false;
		errorMessage = "Invalid edge, strength must be between 0 and 1";
	}

	return {
		isValid,
		errorMessage: errorMessage
	};
};
