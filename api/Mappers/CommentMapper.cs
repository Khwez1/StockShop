using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;
using api.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                CreatedBy = commentModel.UserId,
                StockId = commentModel.StockId
            };
        }
        public static Comment ToCommentFromCreate(this CreateCommentDto commentDto, int StockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = StockId
            };
        }
    }
}