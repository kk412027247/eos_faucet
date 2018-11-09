for (let i=0 ; i< 20 ; i++){
  const _i = i+''+i+i;
  db.news.insert({title:_i, content:_i ,author:'tmd', date: new Date()})
}
