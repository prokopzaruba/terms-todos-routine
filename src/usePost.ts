import { useMutation } from "@tanstack/react-query";
import Axios from "axios";

interface todo {
  task: string;
  date: string;
}

const usePost = (url: string) => {
  const addItem = (item: any) => {
    return Axios.post(url, item);
  };
  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      // I will fire first
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default usePost;
