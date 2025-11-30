using System;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
namespace API.Service;

public class TokenService(IConfiguration config): ITokenService
{
public string CreateToken(AppUser user)
    {
       var tokenKey=config["TokenKey"]??throw new Exception("Cannot get Token Key"  );
       if(tokenKey.Length<64)
            throw new Exception("your Token Key need to be at least 64 characters long");
         
         var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        
        var claim=new List<Claim>
        {
            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.NameIdentifier,user.Id)
        };


        var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor=new SecurityTokenDescriptor
        {
            Subject=new ClaimsIdentity(claim),
            Expires=DateTime.Now.AddDays(7),
            SigningCredentials=creds
        };
        var tokenHandler=new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var token=tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
        
    }
}