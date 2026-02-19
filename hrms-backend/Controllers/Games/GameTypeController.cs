using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Controllers.Games
{
    [ApiController]
    [Authorize]
    [Route("/api/v1{}")]
    public class GameTypeController
    {
    }
}
