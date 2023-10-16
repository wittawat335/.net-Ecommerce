﻿using Ecommerce.Web.Commons;
using Ecommerce.Web.Extenions.Class;
using Ecommerce.Web.Models;
using Ecommerce.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Ecommerce.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly IBaseApiService<User> _service;
        private readonly IBaseApiService<Position> _positionService;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly AppSetting _setting;

        public UserController(IBaseApiService<User> service, IBaseApiService<Position> positionService, IHttpContextAccessor contextAccessor,
         IOptions<AppSetting> options)
        {
            _service = service;
            _positionService = positionService;
            _contextAccessor = contextAccessor;
            _setting = options.Value;
        }
        public IActionResult Index()
        {
            var sessionLogin = _contextAccessor.HttpContext.Session.GetString(Constants.SessionKey.sessionLogin);
            if (sessionLogin == null)
                return RedirectToAction("Login", "Authen");

            return View();
        }

        public async Task<IActionResult> GetList()
        {
            var response = await _service.GetListAsync(_setting.BaseApiUrl + "User/GetList");
            return Json(response);
        }

        [HttpPost]
        public async Task<IActionResult> _PopUpDialog(string id, string action)
        {
            var model = new UserViewModel();
            var response = new Response<User>();
            try
            {
                var listPosition = await _positionService.GetListAsync(_setting.BaseApiUrl + "Position/GetListActive");
                if (listPosition.value.Count() > 0)
                    ViewBag.listPosition = listPosition.value;

                if (!string.IsNullOrEmpty(id))
                    response = await _service.GetAsyncById(_setting.BaseApiUrl + string.Format("User/GetUser/{0}", id));

                model.User = response.value;
                model.Action = action;
            }
            catch
            {
                throw;
            }

            return PartialView(model);
        }

        [HttpPost]
        public async Task<IActionResult> Save(User model)
        {
            var response = new Response<User>();
            try
            {
                if (model != null)
                {
                    switch (model.UserId ?? String.Empty)
                    {
                        case "":
                            response = await _service.InsertAsync(_setting.BaseApiUrl + "User/Add", model);
                            break;

                        default:
                            response = await _service.PutAsync(_setting.BaseApiUrl + "User/Update", model);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                response.message = ex.Message;
            }

            return Json(response);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            var response = await _service.DeleteAsync(_setting.BaseApiUrl + string.Format("User/{0}", id));
            return Json(response);
        }
    }
}
