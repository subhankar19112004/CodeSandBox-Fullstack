import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTree } from "../apis/projects";

export const useTreeStructureStore = create((set, get) => {
    const queryClient = new QueryClient();

    return {
        projectId: null,
        treeStructure: null,
        setTreeStructure: async () => {
            const id = get().projectId;
            const data = await queryClient.fetchQuery({
                queryKey: ['treeStructure', id],
                queryFn: () => getProjectTree({ projectId: id }),
            })
            console.log(data);

            set({
                treeStructure: data
            });
        },
        setProjectId: (projectId) => {
            set({
                projectId: projectId
            });
        }
    }
}) 