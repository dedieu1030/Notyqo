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

import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { CodeBlockElement } from '@/components/ui/code-block-node';
import { CodeLeaf } from '@/components/ui/code-node';
import { H1Element, H2Element, H3Element, H4Element, H5Element, H6Element } from '@/components/ui/heading-node';
import { LinkElement } from '@/components/ui/link-node';
import { ParagraphElement } from '@/components/ui/paragraph-node';
import { ToggleElement } from '@/components/ui/toggle-node';
import { KbdLeaf } from '@/components/ui/kbd-node';

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
  LinkPlugin.withComponent(LinkElement),
  ListPlugin,
  TogglePlugin.withComponent(ToggleElement),

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
