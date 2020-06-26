using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.APIReturnObjects
{
    public class ReturnAPI<T>
    {
        public string Message { get; set; }
        public int Code { get; set; }
        public T Data { get; set; }

        public ReturnAPI(string message, int code, T data)
        {
            Message = message;
            Code = code;
            Data = data;
        }
    }

    public class ReturnAPI
    {
        public string Message { get; set; }
        public int Code { get; set; }

        public ReturnAPI(string message, int code)
        {
            Message = message;
            Code = code;
        }
        public ReturnAPI(int code)
        {
            Message = null;
            Code = code;
        }
    }
}
