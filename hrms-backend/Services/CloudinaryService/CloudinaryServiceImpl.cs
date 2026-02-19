using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using hrms_backend.Models.Events;
using Microsoft.Extensions.Options;

namespace hrms_backend.Services.CloudinaryService
{
    public class CloudinaryServiceImpl
    {
        private readonly CloudinaryConfig _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        public CloudinaryServiceImpl(IOptions<CloudinaryConfig> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig.Value;
            var account = new Account(_cloudinaryConfig.CloudName, _cloudinaryConfig.ApiKey, _cloudinaryConfig.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<UploadResult> UploadDocument(IFormFile file)
        {
            if (file == null) throw new ArgumentNullException("File is empty");

            try
            {
                string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                string name = fileName.Replace(" ", "-");
                string fileExtension = Path.GetExtension(file.FileName);

                using var stream = file.OpenReadStream();
                var publicId = $"documents/{DateTime.UtcNow:yyyy-MM-dd}/{Guid.NewGuid()}_{name}{fileExtension}";
                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    PublicId = publicId,
                    Overwrite = true,
                    Tags = "documents"
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                if (uploadResult.Error != null)
                {
                    throw new Exception($"Cloudinary upload failed: {uploadResult.Error.Message}");
                }

                return new UploadResult
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = publicId
                };
            }
            catch (Exception ex)
            {
                {
                    throw new Exception($"Failed to upload: {ex.Message}");
                }
            }
        }

        public async Task<bool> DeleteFileAsync(string fileUrl)
        {
            if (string.IsNullOrEmpty(fileUrl)) throw new ArgumentNullException("Url is empty");
            try
            {
                var publicId = ExtractPublicIdFromUrl(fileUrl);

                if (string.IsNullOrEmpty(publicId)) return false;

                var deleteParams = new DeletionParams(publicId)
                {
                    ResourceType = ResourceType.Raw
                };

                var result = await _cloudinary.DestroyAsync(deleteParams);
                return result.Result == "ok";
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to delete: {ex.Message}");
            }
        }

        private string ExtractPublicIdFromUrl(string url)
        {
            try
            {

                var uri = new Uri(url);
                var path = uri.AbsolutePath;

                var startIndex = path.IndexOf("/upload/") + 8;
                if (startIndex < 8) return null;

                var publicIdWithExtension = path.Substring(startIndex);

                if (publicIdWithExtension.StartsWith("v"))
                {
                    var slashIndex = publicIdWithExtension.IndexOf('/');
                    if (slashIndex > 0)
                    {
                        publicIdWithExtension = publicIdWithExtension.Substring(slashIndex + 1);
                    }
                }

                return publicIdWithExtension;
            }
            catch
            {
                return null;
            }
        }

    }
}
