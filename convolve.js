(function ()
{
  function zeroes(l)
  {
    return Array.apply(null, new Array(l)).map(Number.prototype.valueOf, 0);
  }

  function expand(a)
  {
    return [0].concat(a, [0]);
  }

  function pad(a, l)
  {
    if (l > 0) return pad(expand(a), l - 1);
    else return a;
  }

  function convolve_iter(a, k, o)
  {
    return o.map(function (x, i)
    {
      return k.reduce(function (y, z, j)
      {
        return y + a[i + j]*z;
      }, 0) || x;
    });
  }

  function convolve(a, k, full)
  {
    var output = convolve_iter(pad(a, -1 + k.length), k.reverse(), zeroes(-1 + a.length + k.length));

    if (full) return output;
    else  return output.slice(0, a.length);
  }

  return convolve;
})();
