// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider, DataProvider, PageProvider } from '@/context'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>
    <AuthProvider>
      <PageProvider>
        <DataProvider>
          {children}
        </DataProvider>
      </PageProvider>
    </AuthProvider>
  </ChakraProvider>
}