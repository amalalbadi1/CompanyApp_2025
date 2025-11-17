using API.Entities;
using API.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    //   [AllowAnonymous]
   
    public class MembersController(AppDbContext context) : BaseApiContoller
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = await context.Users.ToListAsync();
            
            return members;
        }
       [Authorize]
        [HttpGet("{id}")] ///localhost:5001/api/members
        public async Task<ActionResult<AppUser>>GetMember(string id)
        {
            var member = await context.Users.FindAsync(id);

            if (member == null) return NotFound();

            return member;
        
        }
    }
}
