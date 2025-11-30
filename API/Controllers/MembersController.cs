using API.Entities;
using API.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;

namespace API.Controllers
{
    
   [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiContoller
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
          return Ok( await memberRepository.GetMembersAsync());
        }
        
       [Authorize]
        [HttpGet("{id}")] ///localhost:5251/api/members
        public async Task<ActionResult<Member>>GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

            if (member == null) return NotFound();

            return member;
        
        }

        [HttpGet("{Id}/photos")]

        public async Task<ActionResult<IReadOnlyList<Photo>>>GetMemberPhotos( string id)
        {
           return Ok( await memberRepository.GetPhotosForMembersAsync(id));
        }
    }
}
