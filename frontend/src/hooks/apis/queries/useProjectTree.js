import { useQuery } from "@tanstack/react-query";
import { getProjectTree } from "../../../apis/projects";

// import { useQuery } from "@tanstack/react-query"
export const useProjectTree = (projectId) => {
    const { isLoading, isError, error, data:projectTree } = useQuery({
        queryFn: () => getProjectTree({projectId})
    });

    return{
        isLoading,
        isError,
        error,
        data: projectTree
    }
}