import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

Object.defineProperty(global, 'vi', { value: vi });

afterEach(() => cleanup());