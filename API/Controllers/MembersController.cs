using API.Entities;
using API.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using System.Security.Claims;
using API.DTOs;
using API.Extensions;
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
        [HttpPut]
        public async Task<ActionResult>UpdateMember(MemberUpdateDto memberUpdateDto)
        {
            var memberId=User.GetMemberId();
       
            var member= await memberRepository.GetMemberForUpdate(memberId);
           
            if(member==null) return BadRequest("Could not get member");

            member.DisplayName=memberUpdateDto.DisplayName ?? member.DisplayName;
            member.Description=memberUpdateDto.Description ?? member.Description;
            member.City=memberUpdateDto.City ?? member.City;
            member.Country=memberUpdateDto.Country ?? member.Country;

            member.User.DispName =memberUpdateDto.DisplayName ?? member.User.DispName;

              memberRepository.Update(member);
            if(await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update member");
        }
    }
}
