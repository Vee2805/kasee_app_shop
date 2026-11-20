// ==============================================================================
// KASEE SHOP ANALYTICS & DECISION SUPPORT PORTAL
// Frontend Application Logic — Vanilla JavaScript
// ==============================================================================

// 1. DATASETS DEFINITION
const DEBTORS_DATA = [
  { name: "Juja Road Shop", type: "Retail Distribution Partner", category: "partner", debt: 6372, limit: 2000, notes: "Collect balance first before restocking consignment" },
  { name: "Mwangaza Mini Mart", type: "Local Retail Buyer", category: "partner", debt: 4462, limit: 2400, notes: "Requires partial cash payment before releasing goods" },
  { name: "Mount Kenya University", type: "Institutional Soda & Water", category: "institution", debt: 4414, limit: 2000, notes: "Contact Procurement / Catering Department" },
  { name: "Green Garden Hotel", type: "Hospitality / Refreshments", category: "hospitality", debt: 3934, limit: 800, notes: "Require payment of previous consignment first" },
  { name: "PCEA Church", type: "Church Sunday Refreshments", category: "church", debt: 2652, limit: 600, notes: "Contact Church Treasurer before Sunday orders" },
  { name: "Munene College", type: "College Canteen Delivery", category: "institution", debt: 2373, limit: 1500, notes: "Invoice requires signature from canteen manager" },
  { name: "Gretsa University", type: "Departmental Event Orders", category: "institution", debt: 1668, limit: 1200, notes: "Verify delivery note with departmental head" },
  { name: "Witeithie Retailers", type: "Wholesale Grocery Buyer", category: "partner", debt: 1640, limit: 1600, notes: "Balance close to ceiling; monitor closely" },
  { name: "New Life Church", type: "Church Youth Refreshments", category: "church", debt: 1475, limit: 800, notes: "Confirm payment voucher prior to dispatch" },
  { name: "Thika Technical College", type: "College Staff Refreshments", category: "institution", debt: 1249, limit: 1000, notes: "Reconcile payment voucher with staff secretary" },
  { name: "Elija Kagiri", type: "Regular Trusted Buyer", category: "retail", debt: 760, limit: 500, notes: "Clear prior debt before weekend shopping" },
  { name: "Grace Nduta", type: "Neighborhood Retail Customer", category: "retail", debt: 618, limit: 500, notes: "Cash only on counter until balance is settled" }
];

const PRODUCTS_DATA = [
  {
    name: "Steam Original 400ml (12pk)",
    category: "Energy Drink",
    image: "public/images/steam_energy_drink.jpg",
    buyPrice: 400.27,
    sellPrice: 460.31,
    margin: 13.04,
    marginTier: "low",
    strategy: "High Volume / Low Margin: Cap reorder volume; shift capital to produce.",
    focusGrowth: false
  },
  {
    name: "Steam Power 400ml (12pk)",
    category: "Energy Drink",
    image: "public/images/steam_energy_drink.jpg",
    buyPrice: 454.31,
    sellPrice: 522.46,
    margin: 13.04,
    marginTier: "low",
    strategy: "High Volume / Low Margin: Fast turnover, but suppresses overall cash flow.",
    focusGrowth: false
  },
  {
    name: "Fresh Tomatoes (Crate)",
    category: "Fresh Produce",
    image: "public/images/fresh_produce.jpg",
    buyPrice: 67.92,
    sellPrice: 88.30,
    margin: 23.08,
    marginTier: "high",
    strategy: "★ High Margin Opportunity (23.7%): Restock 2-3x weekly to eliminate spoilage.",
    focusGrowth: true
  },
  {
    name: "Red Onions & Sukuma Wiki",
    category: "Fresh Produce",
    image: "public/images/fresh_produce.jpg",
    buyPrice: 78.38,
    sellPrice: 101.89,
    margin: 23.08,
    marginTier: "high",
    strategy: "★ Staple Produce: Onions have zero 48-hr perishability risk; high cash turnaround.",
    focusGrowth: true
  },
  {
    name: "Safi Water 20L Refill Bottle",
    category: "Water Refill",
    image: "public/images/safi_water_refill.jpg",
    buyPrice: 112.95,
    sellPrice: 141.19,
    margin: 20.00,
    marginTier: "high",
    strategy: "★ Prime Focus (20.0% Margin): ZERO perishability, continuous recurring sales.",
    focusGrowth: true
  },
  {
    name: "Safi Water 500ml Bottled",
    category: "Water Refill",
    image: "public/images/safi_water_refill.jpg",
    buyPrice: 194.38,
    sellPrice: 229.37,
    margin: 15.25,
    marginTier: "medium",
    strategy: "Steady margin beverage: Pair with walk-in fresh produce customers.",
    focusGrowth: false
  },
  {
    name: "Assorted Soda 300ml / 500ml",
    category: "Soft Drinks",
    image: "public/images/soft_drinks.jpg",
    buyPrice: 36.57,
    sellPrice: 43.88,
    margin: 16.66,
    marginTier: "medium",
    strategy: "Core institutional supply line: Strictly enforce till credit caps on colleges.",
    focusGrowth: false
  },
  {
    name: "Pura Cooking Oil 1L & Flour 2kg",
    category: "Grocery",
    image: "public/images/staple_groceries.jpg",
    buyPrice: 271.70,
    sellPrice: 304.30,
    margin: 10.71,
    marginTier: "low",
    strategy: "Staple household anchor: Draws daily foot traffic into the shop.",
    focusGrowth: false
  },
  {
    name: "Daily Sliced Bread & Milk 500ml",
    category: "Grocery",
    image: "public/images/bread_and_milk.jpg",
    buyPrice: 50.16,
    sellPrice: 59.19,
    margin: 15.26,
    marginTier: "medium",
    strategy: "Essential morning fast-mover: High daily cash turnaround at the till.",
    focusGrowth: false
  }
];

const CHARTS_DATA = [
  { id: "01", file: "public/charts/01_revenue_vs_margin_by_category.png", title: "Figure 1: Revenue vs Gross Margin by Category", desc: "Energy drinks generate 53.4% of turnover at only 12% margin, while Produce (23.7%) and Water (20.0%) represent huge under-stocked opportunities." },
  { id: "02", file: "public/charts/02_monthly_cash_flow_trend.png", title: "Figure 2: Monthly Cash Flow Volatility Across 23 Months", desc: "Monthly net cash swings wildly by 3.8× (between KES 10,048 and KES 38,538), creating severe periodic liquidity crunches." },
  { id: "03", file: "public/charts/03_credit_exposure_by_customer.png", title: "Figure 3: Uncollected Credit Exposure by Customer in Thika", desc: "KES 34,731 is tied up in 12 accounts, heavily concentrated in Mount Kenya University, Juja Road Shop, and PCEA Church." },
  { id: "04", file: "public/charts/04_product_mix_opportunity.png", title: "Figure 4: Product Mix Opportunity Matrix", desc: "Quadrant analysis distinguishing high-volume/low-margin anchors from high-margin/low-volume growth drivers." },
  { id: "05", file: "public/charts/05_sales_profit_trend.png", title: "Figure 5: 23-Month Sales Turnover vs Net Profit Trajectory", desc: "Historical tracking showing how high turnover failed to translate into proportional profit retention." },
  { id: "06", file: "public/charts/06_customer_type_analysis.png", title: "Figure 6: Customer Segmentation & Risk Profile", desc: "Institutional clients represent the largest credit exposure, while walk-in retail provides immediate cash." },
  { id: "07", file: "public/charts/07_payment_methods.png", title: "Figure 7: Payment Method Distribution", desc: "M-Pesa dominates at 58% of turnover, followed by Cash at 33%, while uncollected credit accounts for 6.2% of sales value." },
  { id: "08", file: "public/charts/08_cash_flow_forecast.png", title: "Figure 8: 6-Month Rolling Time-Series Forecast", desc: "Moving-average forecast projecting a baseline of KES 26,450/month bounded by optimistic (KES 32,480) and conservative (KES 23,625) envelopes." },
  { id: "09", file: "public/charts/09_sensitivity_analysis.png", title: "Figure 9: Sensitivity to Spoilage & Bad Debt Scenarios", desc: "Robustness check testing fresh produce margins dropping to 15% and bad debt write-offs, confirming the safety of a 10% shift." },
  { id: "10", file: "public/charts/10_scenario_comparison.png", title: "Figure 10: Status Quo vs Reallocated Mix Scenario", desc: "Comparing current operations against 10% and 20% shift alternatives, proving net cash flow expands by +KES 2,258 to +KES 2,491/month." }
];

// 2. STOCK MIX SIMULATOR LOGIC
const shiftSlider = document.getElementById("shiftSlider");
const shiftPercentDisplay = document.getElementById("shiftPercentDisplay");
const resShiftedCapital = document.getElementById("res-shifted-capital");
const resMonthlyGain = document.getElementById("res-monthly-gain");
const resAnnualGain = document.getElementById("res-annual-gain");
const resTotalLiquidity = document.getElementById("res-total-liquidity");

function updateSimulator(percent) {
  // Baseline numbers from analysis_engine.py
  // Energy drink monthly baseline restocking ~ KES 54,092
  const monthlyEnergyBudget = 54092.90;
  const energyMargin = 0.1196;
  const targetAvgMargin = 0.2184; // blended fresh produce & water refill
  const marginDelta = targetAvgMargin - energyMargin; // ~ 0.0988
  
  const shiftedCapital = monthlyEnergyBudget * (percent / 100);
  const monthlyNetGain = shiftedCapital * marginDelta * 0.43; // adjusted for turnover cycles
  const annualGain = monthlyNetGain * 12;
  const creditRecoveryMonthly = 2026.00; // 70% debt recovery across 12 months
  const totalLiquidity = monthlyNetGain + creditRecoveryMonthly;

  let labelText = `${percent}% Reallocation`;
  if (percent === 0) labelText = "0% (Current Status Quo)";
  else if (percent === 10) labelText = "10% Trial (Agreed with Client)";
  else if (percent === 20) labelText = "20% Target (90-Day Goal)";
  else if (percent === 25) labelText = "25% Maximum Feasible";

  shiftPercentDisplay.textContent = labelText;
  resShiftedCapital.textContent = `KES ${shiftedCapital.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} / mo`;
  resMonthlyGain.textContent = `+KES ${monthlyNetGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} / mo`;
  resAnnualGain.textContent = `+KES ${annualGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} / yr`;
  resTotalLiquidity.textContent = `+KES ${totalLiquidity.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} / mo`;
}

if (shiftSlider) {
  shiftSlider.addEventListener("input", (e) => {
    updateSimulator(parseInt(e.target.value));
  });
}

// 3. DEBTOR MATRIX RENDERING
const debtorTableBody = document.getElementById("debtorTableBody");
const debtorSearch = document.getElementById("debtorSearch");

function renderDebtors(data) {
  if (!debtorTableBody) return;
  debtorTableBody.innerHTML = "";
  
  data.forEach((d) => {
    const isOver = d.debt > d.limit;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${d.name}</strong></td>
      <td><span class="badge" style="background:#F3F4F6; color:#4B5563;">${d.type}</span></td>
      <td style="font-weight:700; color:${isOver ? 'var(--danger)' : 'var(--text-main)'}">KES ${d.debt.toLocaleString()}</td>
      <td style="color:var(--text-muted)">KES ${d.limit.toLocaleString()}</td>
      <td>
        <span class="badge ${isOver ? 'danger' : 'success'}">
          ${isOver ? 'OVER LIMIT' : 'SAFE'}
        </span>
      </td>
      <td>
        <button class="btn-script" onclick="openScriptModal('${d.name}', ${d.debt}, ${d.limit})">
          💬 Follow-Up Script
        </button>
      </td>
    `;
    debtorTableBody.appendChild(tr);
  });
}

// Debtor filters
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    
    let filtered = DEBTORS_DATA;
    if (filter === "over") {
      filtered = DEBTORS_DATA.filter(d => d.debt > d.limit);
    } else if (filter === "institution") {
      filtered = DEBTORS_DATA.filter(d => d.category === "institution");
    } else if (filter === "church") {
      filtered = DEBTORS_DATA.filter(d => d.category === "church");
    }
    renderDebtors(filtered);
  });
});

if (debtorSearch) {
  debtorSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = DEBTORS_DATA.filter(d => 
      d.name.toLowerCase().includes(query) || d.type.toLowerCase().includes(query)
    );
    renderDebtors(filtered);
  });
}

// 4. COLLECTION SCRIPT MODAL
const scriptModal = document.getElementById("scriptModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalInstName = document.getElementById("modalInstName");
const modalSwahiliScript = document.getElementById("modalSwahiliScript");
const modalEnglishScript = document.getElementById("modalEnglishScript");
const copyScriptBtn = document.getElementById("copyScriptBtn");

window.openScriptModal = function(name, debt, limit) {
  if (!scriptModal) return;
  modalInstName.textContent = `${name} — Current Debt: KES ${debt.toLocaleString()} (Limit: KES ${limit.toLocaleString()})`;
  modalSwahiliScript.textContent = `"Habari mteja, records zetu za Kasee Shop zinaonyesha kuna salio la KES ${debt.toLocaleString()} ambalo limezidi kiwango chetu cha mkopo cha KES ${limit.toLocaleString()}. Sera ya duka inataka tulipe salio la zamani kabla ya kutoa bidhaa nyingine kwa mkopo. Je, mnaweza kulipa kiasi hicho kwa M-Pesa sasa hivi ili tuendelee na huduma?"`;
  modalEnglishScript.textContent = `"Hello, this is Kasee Shop calling regarding your outstanding invoice balance of KES ${debt.toLocaleString()}. Our business credit policy requires account balances above KES ${limit.toLocaleString()} to be cleared prior to dispatching new consignments. Please confirm invoice settlement today."`;
  scriptModal.style.display = "flex";
};

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", () => {
    scriptModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === scriptModal) {
    scriptModal.style.display = "none";
  }
});

if (copyScriptBtn) {
  copyScriptBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(modalSwahiliScript.textContent).then(() => {
      copyScriptBtn.textContent = "Copied to Clipboard! ✓";
      setTimeout(() => {
        copyScriptBtn.textContent = "Copy Swahili Script";
      }, 2000);
    });
  });
}

// 5. PRODUCT CATALOG RENDERING
const productGrid = document.getElementById("productGrid");

function renderProducts(data) {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.src='public/images/steam_energy_drink.jpg'">
        <span class="product-category-tag">${p.category}</span>
        <span class="product-margin-badge ${p.marginTier === 'high' ? 'margin-high' : (p.marginTier === 'medium' ? 'margin-medium' : 'margin-low')}">
          ${p.margin.toFixed(1)}% Margin
        </span>
      </div>
      <div class="product-body">
        <h4 class="product-title">${p.name}</h4>
        <div class="product-pricing">
          <div class="price-item">
            <span class="price-label">Buying Price</span>
            <span class="price-val">KES ${p.buyPrice.toFixed(0)}</span>
          </div>
          <div class="price-item">
            <span class="price-label">Selling Price</span>
            <span class="price-val">KES ${p.sellPrice.toFixed(0)}</span>
          </div>
          <div class="price-item">
            <span class="price-label">Gross Profit</span>
            <span class="price-val" style="color:var(--primary)">+KES ${(p.sellPrice - p.buyPrice).toFixed(0)}</span>
          </div>
        </div>
        <div class="product-strategy ${p.focusGrowth ? 'focus-growth' : ''}">
          ${p.strategy}
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

const catButtons = document.querySelectorAll(".cat-btn");
catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    catButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    
    if (cat === "all") {
      renderProducts(PRODUCTS_DATA);
    } else {
      renderProducts(PRODUCTS_DATA.filter(p => p.category.includes(cat)));
    }
  });
});

// 6. ANALYTICAL CHARTS GALLERY
const chartSelector = document.getElementById("chartSelector");
const activeChartImg = document.getElementById("activeChartImg");
const activeChartTitle = document.getElementById("activeChartTitle");
const activeChartDesc = document.getElementById("activeChartDesc");

function setupCharts() {
  if (!chartSelector) return;
  chartSelector.innerHTML = "";

  CHARTS_DATA.forEach((ch, idx) => {
    const btn = document.createElement("button");
    btn.className = `chart-tab-btn ${idx === 0 ? 'active' : ''}`;
    btn.textContent = `Fig ${ch.id}`;
    btn.title = ch.title;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".chart-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeChartImg.src = ch.file;
      activeChartTitle.textContent = ch.title;
      activeChartDesc.textContent = ch.desc;
    });
    chartSelector.appendChild(btn);
  });
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  renderDebtors(DEBTORS_DATA);
  renderProducts(PRODUCTS_DATA);
  setupCharts();
  updateSimulator(10);
});
