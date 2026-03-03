using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.Build.Experimental.ProjectCache;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDBContext _context;
        public CommentRepository(AppDBContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);

            if (commentModel == null)
            {
                return null;
            }

            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
        {
            var comments = _context.Comments.Include(a => a.User).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Symbol))
            {
                comments = comments.Where(s => s.Stock.Symbol == queryObject.Symbol);
            }if (queryObject.IsDescending == true)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(a => a.User).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentDto commentDto)
        {
            var existingComment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);

            if (existingComment == null)
            {
                return null;
            }

            existingComment.Title = commentDto.Title;
            existingComment.Content = commentDto.Content;
            existingComment.CreatedOn = DateTime.Now;

            await _context.SaveChangesAsync();
            
            return existingComment;
        }
    }
}