import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Spinner, useId, useToast } from "@chakra-ui/react";
import { useMutation } from "@jonbilous/next-js-rpc/client";
import { mapLimit } from "async";
import { useRouter } from "next/router";
import { GetPresignedPut } from "pages/api/images/get_presigned_put";
import { PublishImage } from "pages/api/images/publish";
import { useState } from "react";

const ImageUploader: React.FC = () => {
  const id = useId();

  const signedUrlMutation = useMutation<GetPresignedPut>(
    "/api/images/get_presigned_put/"
  );

  const publishMutation = useMutation<PublishImage>("/api/images/publish/");

  const toast = useToast({ isClosable: true });

  const [progress, setProgress] = useState<null | [number, number]>(null);

  const router = useRouter();

  const handleUpload = async (files: File[]) => {
    setProgress([0, files.length]);

    await mapLimit(files, 2, async (file: File, cb: () => void) => {
      const { url, uid } = await signedUrlMutation.mutateAsync({});

      await fetch(url, { method: "PUT", body: file });

      await publishMutation.mutateAsync({ uid });

      setProgress((curr) => {
        if (!curr) {
          return [1, files.length];
        }

        return [curr[0] + 1, curr[1]];
      });

      return cb();
    });
  };

  return (
    <HStack>
      <Button
        isDisabled={!!progress}
        cursor={"pointer"}
        leftIcon={progress ? <Spinner size="sm" /> : <AddIcon />}
        aria-label="Upload"
        as="label"
        htmlFor={id}
      >
        {!!progress ? "Uploaded " + progress.join(" of ") : "Upload"}
        <input
          multiple
          onChange={(e) => {
            if (e.target.files) {
              handleUpload([...e.target.files])
                .then(() => {
                  const url = new URL(window.location.href);

                  router.push(url);
                })
                .catch((err) => {
                  if (err instanceof Error) {
                    toast({
                      title: err.message,
                      status: "error",
                      position: "top-right",
                    });
                  } else {
                    toast({
                      title: "Something went wrong",
                      status: "error",
                      description: String(err),
                    });
                  }
                })
                .finally(() => {
                  setProgress(null);
                });
            }
          }}
          id={id}
          hidden
          type="file"
        />
      </Button>
    </HStack>
  );
};

export default ImageUploader;
