'use client';

import { ParagraphPlugin } from 'platejs/react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  KbdPlugin,
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
  HorizontalRulePlugin,
  HighlightPlugin,
} from '@platejs/basic-nodes/react';
import { CodeBlockPlugin } from '@platejs/code-block/react';
import { ListPlugin } from '@platejs/list/react';
import { LinkPlugin } from '@platejs/link/react';
import { ImagePlugin, MediaEmbedPlugin } from '@platejs/media/react';
import { TablePlugin } from '@platejs/table/react';
import { IndentPlugin } from '@platejs/indent/react';
import { TogglePlugin } from '@platejs/toggle/react';
import { CaptionPlugin } from '@platejs/caption/react';

import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { CodeBlockElement } from '@/components/ui/code-block-node';
import { CodeLeaf } from '@/components/ui/code-node';
import { H1Element, H2Element, H3Element, H4Element, H5Element, H6Element } from '@/components/ui/heading-node';
import { HighlightLeaf } from '@/components/ui/highlight-node';
import { HrElement } from '@/components/ui/hr-node';
import { ImageElement } from '@/components/ui/media-image-node';
import { KbdLeaf } from '@/components/ui/kbd-node';
import { LinkElement } from '@/components/ui/link-node';
import { MediaEmbedElement } from '@/components/ui/media-embed-node';
import { ParagraphElement } from '@/components/ui/paragraph-node';
import { TableElement } from '@/components/ui/table-node';
import { ToggleElement } from '@/components/ui/toggle-node';

// UI Components
export const plugins = [
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
  HorizontalRulePlugin.withComponent(HrElement),
  LinkPlugin.withComponent(LinkElement),
  ImagePlugin.withComponent(ImageElement),
  MediaEmbedPlugin.withComponent(MediaEmbedElement),
  TablePlugin.withComponent(TableElement),
  TogglePlugin.withComponent(ToggleElement),
  ListPlugin, 

  // Marks
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin.withComponent(CodeLeaf),
  SubscriptPlugin,
  SuperscriptPlugin,
  KbdPlugin.withComponent(KbdLeaf),
  HighlightPlugin.withComponent(HighlightLeaf),
  
  // Functionality
  IndentPlugin,
  CaptionPlugin,
];
