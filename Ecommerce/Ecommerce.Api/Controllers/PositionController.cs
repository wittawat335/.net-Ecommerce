﻿using Ecommerce.Core.DTOs;
using Ecommerce.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Authorize(Roles = "Developer,Administrator,Manager,Employee")]
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _service;

        public PositionController(IPositionService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Developer,Administrator")]
        [HttpGet("GetJsTree/{positionId}")]
        public async Task<IActionResult> GetJsTree(string positionId)
        {
            return Ok(await _service.GetListPermissionData(positionId));
        }

        [HttpGet("GetList")]
        public async Task<IActionResult> GetList()
        {
            return Ok(await _service.GetList());
        }

        [HttpGet("GetListActive")]
        public async Task<IActionResult> GetListActive()
        {
            var filter = new PositionDTO();
            filter.Status = "A";
            return Ok(await _service.GetList(filter));
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _service.Get(id));
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(PositionDTO request)
        {
            return Ok(await _service.Add(request));
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(PositionDTO request)
        {
            return Ok(await _service.Update(request));
        }

        [Authorize(Roles = "Developer")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Ok(await _service.Delete(id));
        }
    }
}
