﻿using AutoMapper;
using Ecommerce.Core.DTOs;
using Ecommerce.Domain.Entities;
using System.Globalization;

namespace Ecommerce.Core.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<PositionRequest, Position>();
            CreateMap<RegisterRequest, User>()
                .ForMember(x => x.PositionId, opt => opt.MapFrom(origin => new Guid(origin.positionId)));
            CreateMap<User, UserPosition>();
            CreateMap<Product, ProductDTO>()
                .ForMember(x => x.CategoryName, opt => opt.MapFrom(origin => origin.Category.CategoryName))
                .ForMember(x => x.Price, opt => opt.MapFrom(origin => Convert.ToString(origin.Price, new CultureInfo("en-US"))))
                .ForMember(x => x.Status, opt => opt.MapFrom(origin => origin.Status == "A" ? "ใช้งาน" : "ไม่ได้ใช้งาน"));
        }
    }
}
