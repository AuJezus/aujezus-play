import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../../services/apiPlaylist";

export function usePlaylist(id) {
  const {
    data: playlist,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylist(id),
  });

  return { isLoading, error, playlist };
}
