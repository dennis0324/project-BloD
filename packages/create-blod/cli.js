#!/usr/bin/env node

import { run } from 'dist/src'

run().catch(err => {
  console.warn(err)
})