import postcss from 'postcss';
import AsyncCore from 'css-modules-loader-core'
import SyncParser from './SyncParser'

export default class SyncCore extends AsyncCore {
  load( sourceString, sourcePath, trace, pathFetcher ) {
    let parser = new SyncParser( pathFetcher, trace )

    const result = postcss( this.plugins.concat( [parser.plugin] ) )
      .process( sourceString, { from: "/" + sourcePath } )

    return { injectableSource: result.css, exportTokens: parser.exportTokens }
  }
}

