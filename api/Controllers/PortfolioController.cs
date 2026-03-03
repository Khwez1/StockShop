using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<User> _userManger;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFMPService _fMPService;
        public PortfolioController(UserManager<User> userManager,
        IStockRepository stockRepo, IPortfolioRepository portfolioRepo, IFMPService fMPService)
        {
            _userManger = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
            _fMPService = fMPService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var userId = User.GetUserId();
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(userId);
            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortofolio(string symbol)
        {
            var userId = User.GetUserId();
            var user = await _userManger.FindByIdAsync(userId);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);

            if (stock == null)
            {
                stock = await _fMPService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return BadRequest("Stock does not exists");
                }
                else
                {
                    await _stockRepo.CreateAsync(stock);
                }
            }

            if (stock == null) 
                return BadRequest("Stock not found")
            ;

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(userId);

            if (userPortfolio.Any(e => e.Symbol.ToLower() == symbol.ToLower())) 
                return BadRequest("Cannot add same stock to portfolio")
            ;

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                UserId = user.Id
            };

            await _portfolioRepo.CreateAsync(portfolioModel);

            if(portfolioModel == null)
            {
                return StatusCode(500, "Could not create");
            }
            else
            {
                return Created();
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            var userId = User.GetUserId();
            var user = await _userManger.FindByIdAsync(userId);
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(userId);

            var filteredStock = userPortfolio.Where(s => s.Symbol.ToLower() == symbol.ToLower()).ToList();

            if(filteredStock.Count() == 1)
            {
                await _portfolioRepo.DeletePortfolio(user, symbol);
            }
            else
            {
                return BadRequest("Stock is not in your portffolio");
            }

            return Ok();
        }
    }
}