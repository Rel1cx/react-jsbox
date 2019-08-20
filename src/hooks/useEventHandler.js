import { useMemo } from "react"

const useEventHandler = (eventHandlerMap, deps) => useMemo(() => eventHandlerMap, deps)

export default useEventHandler