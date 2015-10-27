import AsyncParser from 'css-modules-loader-core/lib/parser';
const importRegexp = /^:import\((.+)\)$/

export default class SyncParser extends AsyncParser {
  plugin( css, result ) {
    this.fetchAllImports( css )
    this.linkImportedSymbols( css )
    this.extractExports( css )

    return result
  }

  fetchImport( importNode, relativeTo, depNr ) {
    let file = importNode.selector.match( importRegexp )[1],
      depTrace = this.trace + String.fromCharCode(depNr)
    const exports = this.pathFetcher( file, relativeTo, depTrace )
    importNode.each( decl => {
      if ( decl.type == 'decl' ) {
        this.translations[decl.prop] = exports[decl.value]
      }
    } )
    importNode.removeSelf()
  }
}
