using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.ReturnAPI
{
    public class ReturnAPI<T>
    {
        public string message { get; set; }
        public int code { get; set; }
        public T data { get; set; }

        public ReturnAPI(string message, int code, T data)
        {
            this.message = message;
            this.code = code;
            this.data = data;
        }
    }
}
