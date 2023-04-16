using EntityFramework_Slider.Data;
using EntityFramework_Slider.Models;
using EntityFramework_Slider.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NuGet.ContentModel;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Text;

namespace EntityFramework_Slider.Controllers
{
    public class HomeController : Controller
    {
        #region Gizli Datalar ucun
        //private readonly ILogger<HomeController> _logger;

        //private readonly IConfiguration _configuration;


        //public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        //{
        //    _logger = logger;
        //    _configuration = configuration;
          
        //}

        //public IActionResult Test()
        //{
        //    var user = _configuration.GetSection("Login:User").Value;

        //    var mail = _configuration.GetSection("Login:Mail").Value;

        //    return Content($"{user} {mail}");
        //}


        #endregion




        private readonly AppDbContext _context;
        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet] 
        public async Task<IActionResult> Index()
        {

            


            List<Slider> sliders = await _context.Sliders.Where(m => !m.SoftDelete).ToListAsync();

            SliderInfo sliderInfo = await _context.SliderInfos.FirstOrDefaultAsync();

            IEnumerable<Blog> blogs = await _context.Blogs.Where(m => !m.SoftDelete).ToListAsync();

            IEnumerable<Category> categories = await _context.Categories.Where(m => !m.SoftDelete).ToListAsync();

            IEnumerable<Product> products = await _context.Products.Include(m => m.Images).Where(m => !m.SoftDelete).ToListAsync();

            About abouts = await _context.Abouts.Include(m => m.Adventages).FirstOrDefaultAsync();

            IEnumerable<Experts> experts = await _context.Experts.Where(m => !m.SoftDelete).ToListAsync();

            ExpertsHeader expertsheaders = await _context.ExpertsHeaders.FirstOrDefaultAsync();

            Subscribe subscribs = await _context.Subscribs.FirstOrDefaultAsync();

            BlogHeader blogheaders = await _context.BlogHeaders.FirstOrDefaultAsync();
            IEnumerable<Say> says = await _context.Says.Where(m => !m.SoftDelete).ToListAsync();

            IEnumerable<Instagram> instagrams = await _context.Instagrams.Where(m => !m.SoftDelete).ToListAsync();

            HomeVM model = new()
            {
                Sliders = sliders,
                SliderInfo = sliderInfo,
                Blogs = blogs,
                Categories = categories,
                Products = products,
                Abouts = abouts,
                Experts = experts,
                ExpertsHeaders = expertsheaders,
                Subscribs = subscribs,
                BlogHeaders = blogheaders,
                Says = says,
                Instagrams = instagrams
            };

            return View(model);
        }


       





       







        
        [HttpPost] 
        /* [ValidateAntiForgeryToken]*/  
        public async Task<IActionResult> AddBasket(int? id)  
        {


            if (id == null) return BadRequest();   

            Product dbProduct = await GetProductById((int)id);   


            if (dbProduct == null) return NotFound();   

       
            List<BasketVM> basket = GetBasketDatas();   

            BasketVM? existProduct = basket.FirstOrDefault(m => m.Id == dbProduct.Id);  


            AddProductToBasket(existProduct, dbProduct, basket);    


            return Ok();


        }

        private async Task<Product> GetProductById(int id)
        {
           return  await _context.Products.FindAsync(id);

        }

        private List<BasketVM> GetBasketDatas()
        {
            List<BasketVM> basket; 

            if (Request.Cookies["basket"] != null)
            {
                basket = JsonConvert.DeserializeObject<List<BasketVM>>(Request.Cookies["basket"]); 
            }
            else
            {
                basket = new List<BasketVM>();   
            }
            return basket;

        }

        private void AddProductToBasket(BasketVM? existProduct,Product dbProduct,List<BasketVM> basket)
        {
           
            if (existProduct == null)
            {
                basket?.Add(new BasketVM
                {   
                    Id = dbProduct.Id,
                    Count = 1
                });
            }
            else
            {
                existProduct.Count++;
            }

            Response.Cookies.Append("basket", JsonConvert.SerializeObject(basket));  
        }
       
    }

    //class Book
    //{
    //    public int Id { get; set;}

    //    public string Name { get; set; }
    //}
}