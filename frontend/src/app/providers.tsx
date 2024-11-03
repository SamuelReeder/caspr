// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider} from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>
    <AuthProvider>
          {children}
    </AuthProvider>
  </ChakraProvider>
}