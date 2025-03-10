interface Agent {
  id: string;
  role: string;
  description: string;
  working: boolean;
  last_active_at: number;
  memory?: string;
}

import { readMemory, writeMemory } from './database';

class AgentManager {
  private agents: Map<string, Agent> = new Map();

  /**
   * 代理签到
   */
  checkIn(id: string, role: string, description: string) {
    this.agents.set(id, {
      id,
      role,
      description,
      working: true,
      last_active_at: Date.now(),
    });
  }

  /**
   * 代理签退
   */
  checkOut(id: string) {
    const agent = this.agents.get(id);
    if (agent) {
      agent.working = false;
      agent.last_active_at = Date.now();
      this.agents.set(id, agent);
    }
  }

  /**
   * 获取所有代理
   */
  getAllAgents() {
    return Array.from(this.agents.values());
  }

  /**
   * 通过ID获取代理
   */
  getAgentById(id: string) {
    return this.agents.get(id);
  }

  /**
   * 写入代理记忆
   */
  writeMemory(id: string, memory: string) {
    writeMemory(id, memory);
  }

  /**
   * 获取代理记忆
   */
  getMemory(id: string): string | null {
    return readMemory(id);
  }
}

export default new AgentManager(); 