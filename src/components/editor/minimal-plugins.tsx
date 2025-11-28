'use client';

import { ParagraphPlugin } from 'platejs/react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
} from '@platejs/basic-nodes/react';
import { CodeBlockPlugin } from '@platejs/code-block/react';
import { ListPlugin } from '@platejs/list/react';
import { LinkPlugin } from '@platejs/link/react';

import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { CodeBlockElement } from '@/components/ui/code-block-node';
import { CodeLeaf } from '@/components/ui/code-node';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { LinkElement } from '@/components/ui/link-node';
import { ParagraphElement } from '@/components/ui/paragraph-node';

export const minimalPlugins = [
  // Nodes
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.withComponent(H1Element),
  H2Plugin.withComponent(H2Element),
  H3Plugin.withComponent(H3Element),
  BlockquotePlugin.withComponent(BlockquoteElement),
  CodeBlockPlugin.withComponent(CodeBlockElement),
  LinkPlugin.withComponent(LinkElement),
  ListPlugin,

  // Marks
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin.withComponent(CodeLeaf),
];
