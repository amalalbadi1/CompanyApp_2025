using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDtos
{
    [Required]
 public  string DispName { get; set; }="";

  [Required]
  [EmailAddress]
 public  string Email { get; set; } ="";
     [Required]
     [MinLength(4)]    
    public  string Password { get; set; }  =""; 
}
