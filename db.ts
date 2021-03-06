import * as sqlite3 from 'sqlite3'

export function run() {
  const db = new sqlite3.Database(':memory:')

  db.serialize(function() {
    db.run('CREATE TABLE lorem (info TEXT)')

    const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    for (let i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i)
    }
    stmt.finalize()

    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
      console.log(row.id + ': ' + row.info)
    })
  })

  db.close()
}
