﻿using Ecommerce.Web.Extenions.Class;
using Ecommerce.Web.Models;
using Ecommerce.Web.Services;
using Ecommerce.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Ecommerce.Web.Controllers
{
    public class ProductController : Controller
    {
        private readonly IBaseApiService<Product> _productService;
        private readonly IWebHostEnvironment _environment;
        private readonly AppSetting _setting;

        public ProductController(IBaseApiService<Product> productService, IOptions<AppSetting> options, IWebHostEnvironment environment)
        {
            _productService = productService;
            _setting = options.Value;
            _environment = environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Test()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetImage(string productId)
        {
            return Json(await _productService.GetAsyncById(_setting.BaseApiUrl + string.Format("Product/GetImage/{0}", productId)));
        }

        [HttpPost]
        public IActionResult _PopUpDialog(string id, string action)
        {
            var model = new Product();
            return PartialView(model);
        }

        public async Task<IActionResult> GetList(Product filter = null)
        {
            var response = await _productService.GetListAsync(_setting.BaseApiUrl + "Product/GetList", filter);
            return Json(response);
        }

        private string UploadFile(Product model)
        {
            string fileName = null;

            if (model.Image != null)
            {
                string uploadFolder = Path.Combine(_environment.WebRootPath, "images\\product");
                if (!Directory.Exists(uploadFolder))
                    Directory.CreateDirectory(uploadFolder);

                fileName = model.ProductId;
                string filePath = Path.Combine(uploadFolder, fileName);
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.ImageFile.CopyTo(fileStream);
                }
            }

            return fileName;
        }

        [NonAction]
        private string GetFilepath(string productId)
        {
            return _environment.WebRootPath + "\\upload\\images\\product\\" + productId;
        }
    }
}
