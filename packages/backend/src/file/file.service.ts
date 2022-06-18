import { mkdirSync } from "fs";
import path from "path";

import { S3 } from "@aws-sdk/client-s3";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { OSSConfig, RuntimeConfig } from "../config.interface";

interface SaveFileOption {
  name: string;
  buffer: Buffer;
  type: "file";
}

interface SaveURLOption {
  name: string;
  url: string;
  type: "url";
}

type SaveOption = SaveFileOption | SaveURLOption;

@Injectable()
export class FileService {
  uploadPath: string;
  S3Client: S3;
  constructor(
    private readonly runtimeConfig: RuntimeConfig,
    private readonly ossConfig: OSSConfig,
    private readonly httpService: HttpService
  ) {
    this.uploadPath = path.join(runtimeConfig.DIR, "upload");
    mkdirSync(this.uploadPath, { recursive: true });
    this.S3Client = new S3({
      endpoint: ossConfig.ENDPOINT,
      region: ossConfig.REGION,
      credentials: {
        accessKeyId: ossConfig.ACCESS_KEY_ID,
        secretAccessKey: ossConfig.ACCESS_KEY_SECRET,
      },
    });
  }
  private async saveOSS(file: SaveFileOption) {
    const timestamp = Date.now();
    const key = `${timestamp}-${file.name}`;
    await this.S3Client.putObject({
      Bucket: this.ossConfig.BUCKET,
      Body: file.buffer,
      Key: key,
    });
    return `${this.ossConfig.ENDPOINT}/${this.ossConfig.BUCKET}/${key}`;
  }
  private async download(url: string): Promise<Buffer> {
    const res = await firstValueFrom(
      this.httpService.get(url, { responseType: "arraybuffer" })
    );
    return res.data;
  }
  async save(option: SaveOption): Promise<string> {
    if (option.type === "url") {
      const buffer = await this.download(option.url);
      const file = {
        name: option.name,
        buffer,
        type: "file",
      } as const;
      return this.save(file);
    } else {
      return this.saveOSS(option);
    }
  }
}
