/* eslint-disable */

// @ts-nocheck

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as CardRouteImport } from './routes/card'
import { Route as PrintRouteImport } from './routes/print'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const CardRoute = CardRouteImport.update({
  id: '/card',
  path: '/card',
  getParentRoute: () => rootRouteImport,
} as any)
const PrintRoute = PrintRouteImport.update({
  id: '/print',
  path: '/print',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/card': typeof CardRoute
  '/print': typeof PrintRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/card': typeof CardRoute
  '/print': typeof PrintRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/card': typeof CardRoute
  '/print': typeof PrintRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/card' | '/print'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/card' | '/print'
  id: '__root__' | '/' | '/card' | '/print'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CardRoute: typeof CardRoute
  PrintRoute: typeof PrintRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/card': {
      id: '/card'
      path: '/card'
      fullPath: '/card'
      preLoaderRoute: typeof CardRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/print': {
      id: '/print'
      path: '/print'
      fullPath: '/print'
      preLoaderRoute: typeof PrintRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CardRoute: CardRoute,
  PrintRoute: PrintRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
