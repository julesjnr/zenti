/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OutreachScript {
  id: string;
  title: string;
  subject?: string;
  body: string;
}

export interface BusinessTarget {
  icon: string;
  name: string;
  why: string;
  tag: 'High pain' | 'High value' | 'Easy sell' | 'Quick win' | 'High volume';
}

export interface ColdCallStep {
  number: number;
  title: string;
  description: string;
}

export interface ObjectionResponse {
  objection: string;
  response: string;
}

export interface DeploymentStep {
  phase: string;
  number: number;
  title: string;
  description: string;
}
