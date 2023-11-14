﻿using Ecommerce.Web.Extenions.Class;
using Ecommerce.Web.Models;
using Ecommerce.Web.Models.Menu;
using Ecommerce.Web.Models.Position;
using Ecommerce.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Ecommerce.Web.Controllers
{
    public class PositionController : Controller
    {
        private readonly IBaseApiService<Position> _PositionService;
        private readonly IBaseApiService<Menu> _MenuService;
        private readonly IPermissionService _permissionService;
        private readonly ICommonService _common;
        private readonly AppSetting _setting;

        public PositionController(IBaseApiService<Position> PositionService,
           IBaseApiService<Menu> MenuService,
           IPermissionService permissionService,
           ICommonService common,
           IOptions<AppSetting> options)
        {
            _PositionService = PositionService;
            _permissionService = permissionService;
            _MenuService = MenuService;
            _common = common;
            _setting = options.Value;
        }
        public IActionResult Index() { return View(); }

        [HttpPost]
        public async Task<IActionResult> _PopUpPosition(string id, string action)
        {
            var model = new PositionViewModel();
            var position = new Response<Position>();
            var listMenu = new Response<List<Menu>>();
            var session = _common.GetSessionValue();

            if (!string.IsNullOrEmpty(id) && session != null)
            {
                position = await _PositionService.GetAsyncById(_setting.BaseApiUrl + string.Format("Position/Get/{0}", id));
                listMenu = await _MenuService.GetListAsync(_setting.BaseApiUrl + string.Format("Menu/GetListByPermission/{0}", id));
            }

            if (position.isSuccess) model.Position = position.value;
            if (listMenu.isSuccess) ViewBag.listMenu = listMenu.value;
            model.Action = action;

            return PartialView(model);
        }

        [HttpPost]
        public IActionResult _PopUpMenuPosition(string id)
        {
            ViewBag.positionId = id;
            return PartialView();
        }

    }

}
