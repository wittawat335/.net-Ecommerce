﻿using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
