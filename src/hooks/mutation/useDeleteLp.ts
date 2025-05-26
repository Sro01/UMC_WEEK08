import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";

export default function useDeleteLp() {
  return useMutation({ mutationFn: deleteLp });
}
