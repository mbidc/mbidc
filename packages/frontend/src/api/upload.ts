import { APIResponse, fetcher } from "./fetcher";

export async function upload(
  file: string | File,
  name?: string,
  type?: "cloud" | "local",
) {
  if (typeof file === "string") {
    return (
      await fetcher<APIResponse<string>>(APIResponse, {
        authorize: true,
      })("/file/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: file,
          name: name,
          type: type,
        }),
      })
    ).data;
  } else {
    const form = new FormData();
    form.append("file", file, name ?? file.name);
    if (type) form.append("type", type);
    return (
      await fetcher<APIResponse<string>>(APIResponse, {
        authorize: true,
      })("/file", {
        method: "POST",
        body: form,
      })
    ).data;
  }
}
