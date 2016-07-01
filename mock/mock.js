module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php\?rtype=origin$/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=refresh$/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=more$/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=machinery-origin$/,
      respondwith: './machinery.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=machinery-refresh$/,
      respondwith: './machinery.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=machinery-more$/,
      respondwith: './machinery.json'
    },
    {
      pattern: /\/api\/getLiveDetail.php\?id=\d+$/,
      respondwith: './detail.json'
    }
  ]
};
