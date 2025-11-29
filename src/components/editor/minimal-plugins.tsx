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
  H4Plugin,
  H5Plugin,
  H6Plugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  KbdPlugin,
} from '@platejs/basic-nodes/react';
import { CodeBlockPlugin } from '@platejs/code-block/react';
import { ListPlugin } from '@platejs/list/react';
import { LinkPlugin } from '@platejs/link/react';
import { TogglePlugin } from '@platejs/toggle/react';
import { IndentPlugin } from '@platejs/indent/react';

import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { CodeBlockElement } from '@/components/ui/code-block-node';
import { CodeLeaf } from '@/components/ui/code-node';
import { H1Element, H2Element, H3Element, H4Element, H5Element, H6Element } from '@/components/ui/heading-node';
import { LinkElement } from '@/components/ui/link-node';
import { ParagraphElement } from '@/components/ui/paragraph-node';
import { ToggleElement } from '@/components/ui/toggle-node';
import { KbdLeaf } from '@/components/ui/kbd-node';
// import { TodoListElement } from '@/components/ui/todo-list-element';

export const minimalPlugins = [
  // Nodes
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.withComponent(H1Element),
  H2Plugin.withComponent(H2Element),
  H3Plugin.withComponent(H3Element),
  H4Plugin.withComponent(H4Element),
  H5Plugin.withComponent(H5Element),
  H6Plugin.withComponent(H6Element),
  BlockquotePlugin.withComponent(BlockquoteElement),
  CodeBlockPlugin.withComponent(CodeBlockElement),
  LinkPlugin.withComponent(LinkElement).configure({
    options: {
      isUrl: (url) => true, // Allow any string as URL (no protocol enforcement)
    },
  }),
  ListPlugin,
  
  TogglePlugin.withComponent(ToggleElement),

  // Functionality
  IndentPlugin.extend({
    inject: {
      targetPlugins: [
        ParagraphPlugin.key,
        H1Plugin.key,
        H2Plugin.key,
        H3Plugin.key,
        H4Plugin.key,
        H5Plugin.key,
        H6Plugin.key,
        BlockquotePlugin.key,
        CodeBlockPlugin.key,
        TogglePlugin.key,
      ],
    },
  }),

  // Marks
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin.withComponent(CodeLeaf),
  SubscriptPlugin,
  SuperscriptPlugin,
  KbdPlugin.withComponent(KbdLeaf),
];
