import path from 'path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  // Use forward slashes even on Windows to avoid escape character issues
  schema: './prisma/schema.prisma', 
  migrate: {
    adapter: async () => {
      const { PrismaNeon } = await import('@prisma/adapter-neon')
      const { neonConfig, Pool } = await import('@neondatabase/serverless')
      const ws = await import('ws')
      // Use bracket notation to avoid parser confusion with 'default'
      neonConfig.webSocketConstructor = ws['default'] 
      
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      })
      return new PrismaNeon(pool)
    },
  },
})