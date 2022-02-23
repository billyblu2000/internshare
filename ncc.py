import os
import sys

name = sys.argv[1]
root = os.getcwd() + '/src/components/' + name + '/'
os.mkdir(root)
file = open(root + 'index.jsx', 'w')
init_content = r'''import React, { Component } from 'react'
import './index.css'

export default class ''' + name + ' extends Component {\n'
init_content += ''' render() {
    return (
      <div></div>
    )
  }
}
'''
file.write(init_content)
file.close()
file = open(root + 'index.css', 'w')
file.close()