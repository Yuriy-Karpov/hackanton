import {_get} from "./get";

export function goGraph(graph: Object, context: string) {
    const path = context
        .split('.')
        .join('.children.');
    return _get(graph, `children.${path}`);
}
