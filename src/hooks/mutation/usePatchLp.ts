import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";

export default function usePatchLp() {
  return useMutation({ mutationFn: patchLp });
}
