import boto3
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/" if BUCKET_NAME else None
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

# Only initialize S3 client if credentials are available
s3 = None
if os.environ.get("S3_KEY") and os.environ.get("S3_SECRET") and BUCKET_NAME:
    s3 = boto3.client(
       "s3",
       aws_access_key_id=os.environ.get("S3_KEY"),
       aws_secret_access_key=os.environ.get("S3_SECRET")
    )


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    if not s3:
        return {"errors": "S3 is not configured. Image upload is disabled."}
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
