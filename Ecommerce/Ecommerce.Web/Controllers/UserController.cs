﻿using Ecommerce.Web.Commons;
using Ecommerce.Web.Extenions.Class;
using Ecommerce.Web.Models;
using Ecommerce.Web.Models.Position;
using Ecommerce.Web.Models.User;
using Ecommerce.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Ecommerce.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly IBaseApiService<User> _service;
        private readonly IBaseApiService<Position> _positionService;
        private readonly AppSetting _setting;

        public UserController(IBaseApiService<User> service, IBaseApiService<Position> positionService, IOptions<AppSetting> options)
        {
            _service = service;
            _positionService = positionService;
            _setting = options.Value;
        }
        public IActionResult Index() { return View(); }

        [HttpPost]
        public async Task<IActionResult> _PopUpDialog(string id, string action)
        {
            var model = new UserViewModel();
            var response = new Response<User>();
            model.Action = action;
            var listPosition = await _positionService.GetListAsync(_setting.BaseApiUrl + "Position/GetListActive");
            if (listPosition.value.Count() > 0) ViewBag.listPosition = listPosition.value;

            if (!string.IsNullOrEmpty(id))
                response = await _service.GetAsyncById(_setting.BaseApiUrl + string.Format("User/GetUser/{0}", id));

            if (response.value != null) model.User = response.value;

            return PartialView(model);
        }
    }
}
