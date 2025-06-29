import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('account') || process.env.S3_CURRENT_JSON_KEY

  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_CURRENT_JSON_ACCESS_KEY!,
      secretAccessKey: process.env.S3_CURRENT_JSON_SECRET_ACCESS_KEY!,
    },
  })
  const command = new GetObjectCommand({
    Bucket: process.env.S3_CURRENT_JSON_BUCKET,
    Key: key,
  })
  const s3res = await s3.send(command)
  const body = await s3res.Body?.transformToString?.()
  const json = body ? JSON.parse(body) : {}

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
